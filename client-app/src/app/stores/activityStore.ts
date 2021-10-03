import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { format } from "date-fns";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/pagination";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null
  pagingParamas = new PagingParams();
  predicate = new Map().set('all', true)

  constructor() {
    makeAutoObservable(this); //skuzi sam propertije nemoras make observable a sa arrwoi functionom ne moras boundat uz  klasu

    reaction(
      ()=> this.predicate.keys(), 
      ()=>{
        this.pagingParamas = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    )
  }

  setPagingParams = (pagingParamas : PagingParams)=>{
    this.pagingParamas = pagingParamas
  }

  setPredicate = (predicate: string,value:string |Date)=>{
    const resetPredicate =()=>{
      this.predicate.forEach((value,key)=>{
        if (key !=='startDate') this.predicate.delete(key)
      })
    }
    switch (predicate){
      case 'all':
        resetPredicate()
        this.predicate.set('all',true)
        break;
      case 'isGoing':
        resetPredicate()
        this.predicate.set('isGoing',true)
        break;
      case 'isHost':
          resetPredicate()
          this.predicate.set('isHost',true)
          break;
      case 'startDate':
        this.predicate.delete('startDate')
        this.predicate.set('startDate',value)
    }

  }

  get axiosParams(){
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParamas.pageNumber.toString());
    params.append('pageSize',this.pagingParamas.pageSize.toString());
    this.predicate.forEach((value,key)=>{
      if(key === 'startDate'){
        params.append(key,(value as Date).toISOString())
      }else{
        params.append(key,value)
      }
    })
    return params
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    ); //computed porperty vracamo po datumeu poredano
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.loadingInitial=true
    try {
      const result = await agent.Activities.list(this.axiosParams);
      result.data.forEach((activity) => {
        this.setActivity(activity);
      });
      this.loadingInitial = false;
      this.setPagination(result.pagination)
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };


  setPagination = (pagination:Pagination)=>{
    this.pagination=pagination
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
    }
    try {
      activity = await agent.Activities.details(id);
      this.setActivity(activity);
      runInAction(() => {
        this.selectedActivity = activity;
      });

      this.setLoadingInitial(false);
      return activity;
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  private setActivity = (activity: Activity) => {
    const user=store.userStore.user;
    if (user){
      activity.isGoing=activity.attendees!.some(
        a=>a.username===user.username
      )//vraća boolean za svaki user jel ide
      activity.isHost=activity.hostUserName===user.username;
      activity.host=activity.attendees?.find(x=>x.username===activity.hostUserName)
    }
    activity.date = new Date(activity.date!); //sam datum dobijes bro
    this.activityRegistry.set(activity.id, activity);
  };
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActvity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity); //minjenas array s novim, ulkanjas stari stavljas updejtani activity
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        //this.activities=[...this.activities.filter(a=>a.id!==id)]
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
