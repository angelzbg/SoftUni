import { makeAutoObservable, runInAction } from 'mobx';
import { networkCall, notify } from '../../utils/utils';
import { homeFilters, homeFiltersActive } from '../../pages/home/constants';

const getSection = (rf, rt, fIds, data) => {
  return data.map((item) => {
    const [requestFrom, requestTo, isFriend] = [rf?.[item._id], rt?.[item._id], fIds.includes(item._id)];
    return { ...item, requestFrom, requestTo, isFriend };
  });
};

export default class HomeStore {
  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }

  loading = true;
  filters = homeFilters;
  filtersActive = homeFiltersActive;
  setFilter = (filter) => {
    if (this.filtersActive.includes(filter)) {
      this.filtersActive = this.filtersActive.filter((f) => f !== filter);
      if (!this.filtersActive.length) {
        this.filtersActive.push(Object.values(homeFilters).find((f) => f !== filter));
      }
    } else {
      this.filtersActive.push(filter);
    }
  };

  get userInfo() {
    return [this.root.requestsFrom, this.root.requestsTo, this.root.friendsIds];
  }

  get topDevs() {
    return getSection(...this.userInfo, this.data.topDevs || []);
  }

  get topOrgs() {
    return getSection(...this.userInfo, this.data.topOrgs || []);
  }

  get newDevs() {
    return getSection(...this.userInfo, this.data.newDevs || []);
  }

  get newOrgs() {
    return getSection(...this.userInfo, this.data.newOrgs || []);
  }

  get topDevsNear() {
    return getSection(...this.userInfo, this.data.topDevsNear || []);
  }

  get topOrgsNear() {
    return getSection(...this.userInfo, this.data.topOrgsNear || []);
  }

  get newDevsNear() {
    return getSection(...this.userInfo, this.data.newDevsNear || []);
  }

  get newOrgsNear() {
    return getSection(...this.userInfo, this.data.newOrgsNear || []);
  }

  data = {};
  getData = async () => {
    const response = await networkCall({ path: `/api/home`, method: 'GET' });
    if (response.error) {
      notify(response);
    } else {
      runInAction(() => (this.data = response.okay));
    }

    if (this.loading) {
      runInAction(() => (this.loading = false));
    }

    return response;
  };
}
