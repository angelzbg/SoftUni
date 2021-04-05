import { makeAutoObservable, runInAction } from 'mobx';
import { networkCall, notify } from '../../utils/utils';

export default class SearchStore {
  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }

  results = [];
  loading = false;
  noresults = false;
  saved = false;
  allowPaginate = false;
  paginating = false;
  lastSearch = null;

  get canPaginate() {
    return !this.loading && !this.paginating && this.allowPaginate;
  }

  getResults = async (isPagination, type, name, city) => {
    if (isPagination && !this.canPaginate) {
      return;
    }

    runInAction(() => (!isPagination ? (this.loading = true) : (this.paginating = true)));

    const response = await networkCall({
      path: `/api/search`,
      method: 'POST',
      body: isPagination ? { skip: this.results.length, ...this.lastSearch } : { type, name, city },
    });
    if (response.okay) {
      runInAction(() => {
        this.results = isPagination ? this.results.concat(response.okay) : response.okay;
        this.saved = !!response.okay.length || !!this.results.length;
        this.noresults = !this.results.length;
        this.allowPaginate = response.okay.length === 12;
        if (!isPagination) {
          this.lastSearch = { type, name, city };
        }
      });
    } else {
      notify(response);
    }

    runInAction(() => (!isPagination ? (this.loading = false) : (this.paginating = false)));

    return response;
  };

  setNoResults = () => {
    this.noresults = false;
  };

  get items() {
    return this.results.map((item) => {
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
}
