import { makeAutoObservable, runInAction } from 'mobx';
import { networkCall, notify } from '../../utils/utils';

export default class DevelopersStore {
  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }

  filters = {
    new: 'New Developers',
    top: 'Top Rated Developers',
    'new-local': 'New Local Developers',
    'top-local': 'Top Rated Local Developers',
  };

  isValidFilter = (filter = '', isAuthenticated = false) => {
    const authFilters = ['new-local', 'top-local'];
    if (Object.keys(this.filters).includes(filter) && (!isAuthenticated ? !authFilters.includes(filter) : true)) {
      return true;
    }

    return false;
  };

  filter = 'new';
  setFilter = (filter = '') => {
    if (this.filter !== filter) {
      this.filter = filter;
      this.getData();
    } else if (!this.data.length) {
      this.getData();
    } else if (this.canSync && !['top', 'top-local'].includes(this.filter)) {
      this.getData(0, 12 /*len*/, false, true);
    }
  };

  get canSync() {
    return !this.loading && !this.syncing && !this.paginating;
  }

  get canPaginate() {
    return this.allowPaginate && !this.paginating && !this.syncing;
  }

  getfilterBody = () => {
    const criteria = {
      new: () => ({ created: this.data[this.data.length - 1]?.created ?? Number.MAX_SAFE_INTEGER }),
      'new-local': () => ({ created: this.data[this.data.length - 1]?.created ?? Number.MAX_SAFE_INTEGER }),
      /*top: { rating: this.data[this.data.length]?.rating ?? 5 },
      'top-local': { rating: this.data[this.data.length]?.rating ?? 5 },*/
    };
    return criteria[this.filter]?.() || {};
  };

  get items() {
    return this.data.map((item) => {
      const [requestFrom, requestTo, isFriend] = [
        this.root.requestsFrom[item._id],
        this.root.requestsTo[item._id],
        this.root.friendsIds.includes(item._id),
      ];
      return {
        ...item,
        requestFrom,
        requestTo,
        isFriend,
      };
    });
  }

  paginating = false;
  allowPaginate = false;
  loading = false;
  syncing = false;
  data = [];
  getData = async (skip = 0, limit = 12, isLoad = true, isSync = false) => {
    runInAction(() => (isLoad ? (this.loading = true) : isSync ? (this.syncing = true) : (this.paginating = true)));

    const response = await networkCall({
      path: '/api/developers',
      method: 'POST',
      body: {
        skip,
        limit,
        filter: this.filter,
        ...(isLoad ? {} : isSync ? { created: this.data[0]?.created } : this.getfilterBody()),
        isSync,
      },
    });

    if (response.error) {
      notify(response);
    } else {
      runInAction(() => {
        this.data = isLoad ? response.okay : isSync ? response.okay.concat(this.data) : this.data.concat(response.okay);
        if (isLoad || (!isLoad && !isSync)) {
          this.allowPaginate = response.okay.length === limit;
        }
      });
    }

    runInAction(() => (isLoad ? (this.loading = false) : isSync ? (this.syncing = false) : (this.paginating = false)));

    return response;
  };
}
