import { makeAutoObservable, runInAction } from 'mobx';
import { networkCall, notify } from '../../utils/utils';
//import _ from 'lodash';

export class ActivityStore {
  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }

  filters = {
    /*connections: 'Connections',
    requests: 'Requests',*/
    comments: 'Comments',
  };

  filter = 'comments'; // 'connections'

  isValidFilter = (filter = '') => Object.keys(this.filters).includes(filter);

  setFilter = (filter = '') => {
    this.filter = filter;
    if (filter === 'comments') {
      this.getComments();
    }
  };

  get items() {
    if (!this.root.user) {
      return [];
    }

    const requests = this.root.requests;
    if (this.filter === 'requests') {
      return requests;
    }

    const currentUserId = this.root.user._id;

    //let fList = {};
    let friends = this.root.friends.map((f) => {
      //const user = f.users[0]._id === currentUserId ? f.users[1] : f.users[0];
      //fList[user._id] = user;
      return f;
    });

    if (this.filter === 'connections') {
      return friends;
    }

    //const fListIds = Object.keys(fList);
    return this.comments.map((c) => {
      /*const fLikes = _.intersection(fListIds, c.likes).map((fId) => fList[fId]);
      const fDislikes = _.intersection(fListIds, c.dislikes).map((fId) => fList[fId]);*/
      const infoUser = c.userId._id === currentUserId ? c.accountId : c.userId;
      const [requestFrom, requestTo, isFriend] = [
        !!this.root.requestsFrom[infoUser._id],
        !!this.root.requestsTo[infoUser._id],
        this.root.friendsIds.includes(infoUser._id),
      ];
      return { ...c, /*fLikes, fDislikes,*/ requestFrom, requestTo, isFriend, infoUser, currentUserId };
    });
  }

  get canPaginateComments() {
    return this.allowPaginateComments && !this.paginatingComments && !this.loadingComments;
  }

  comments = [];
  loadingComments = false;
  paginatingComments = false;
  allowPaginateComments = false;
  getComments = async (isPaginating = false) => {
    if ((!isPaginating && this.loadingComments) || (isPaginating && !this.canPaginateComments)) {
      return;
    }

    runInAction(() => (isPaginating ? (this.paginatingComments = true) : (this.loadingComments = true)));

    let body = {};
    if (isPaginating) {
      body = { createdComment: this.comments[this.comments.length - 1]?.created };
    }

    const response = await networkCall({ path: '/api/activity/comments', method: 'POST', body });
    if (response.okay) {
      runInAction(() => {
        if (isPaginating) {
          this.comments = this.comments.concat(response.okay);
        } else {
          this.comments = response.okay;
        }
        this.allowPaginateComments = response.okay.length === 20;
      });
    } else {
      notify(response);
    }

    runInAction(() => (isPaginating ? (this.paginatingComments = false) : (this.loadingComments = false)));

    return response;
  };
}
