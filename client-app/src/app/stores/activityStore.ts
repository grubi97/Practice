import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)//skuzi sam propertije nemoras make observable a sa arrwoi functionom ne moras boundat uz  klasu

    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))//computed porperty vracamo po datumeu poredano
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date=activity.date;
                activities[date]=activities[date] ?[...activities[date],activity]:[activity]

                return activities
            },{} as {[key:string]:Activity[]})
        )
    }




    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();


            activities.forEach(activity => {
                this.setActivity(activity)

            })
            this.loadingInitial = false

            this.setLoadingInitial(false)


        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)



        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity;
        } else {
            this.setLoadingInitial(true)
        }
        try {
            activity = await agent.Activities.details(id)
            this.setActivity(activity)
            runInAction(() => {
                this.selectedActivity = activity
            })

            this.setLoadingInitial(false)
            return activity;

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false)
        }

    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]//sam datum dobijes bro
        this.activityRegistry.set(activity.id, activity);

    }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }


    createActvity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;

            })
        }
    }


    updateActivity = async (activity: Activity) => {
        this.loading = true
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)//minjenas array s novim, ulkanjas stari stavljas updejtani activity
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })


        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })

        }


    }

    deleteActivity = async (id: string) => {
        this.loading = true

        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                //this.activities=[...this.activities.filter(a=>a.id!==id)]
                this.activityRegistry.delete(id)
                this.loading = false

            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }

    }



}