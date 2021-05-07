import { action, makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"
import{v4 as uuid} from 'uuid'
import { SegmentGroup } from "semantic-ui-react";

export default class ActivityStore{

    activityRegistry=new Map<string,Activity>();
    selectedActivity:Activity | undefined=undefined
    editMode=false;
    loading=false;
    loadingInitial=true;

    constructor(){
        makeAutoObservable(this)//skuzi sam propertije nemoras make observable a sa arrwoi functionom ne moras boundat uz  klasu
        
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))//computed porperty vracamo po datumeu poredano
    }

    


    loadActivities= async ()=>{
        try{
            const activities= await agent.Activities.list();
           

                activities.forEach(activity=>{
                    activity.date=activity.date.split('T')[0]//sam datum dobijes bro
                    this.activityRegistry.set(activity.id,activity);
                  })
                  this.loadingInitial=false

                  this.setLoadingInitial(false)


        }catch(error){
            console.log(error)
            this.setLoadingInitial(false)

     
            
        }
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state
    }

    selectActivity=(id:string)=>{
        this.selectedActivity=this.activityRegistry.get(id);
    }


    cancelSelectedActivity=()=>{
        this.selectedActivity=undefined
    }

    openForm=(id?:string)=>{
        id ? this.selectActivity(id):this.cancelSelectedActivity();
        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;
    }

    createActvity=async(activity:Activity)=>{
        this.loading=true;
        activity.id=uuid()
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity)
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;

            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;

            })
        }
    }


    updateActivity=async(activity:Activity)=>{
        this.loading=true
        try{
            await agent.Activities.update(activity)
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity)//minjenas array s novim, ulkanjas stari stavljas updejtani activity
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false; 
                
            })


        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading=false
            })
            
        }


    }

    deleteActivity=async(id:string)=>{
        this.loading=true

        try{
            await agent.Activities.delete(id)
            runInAction(()=>{
                //this.activities=[...this.activities.filter(a=>a.id!==id)]
                this.activityRegistry.delete(id)
                if(this.selectedActivity?.id===id) this.cancelSelectedActivity()//?zbog undefined
                this.loading=false

            })

        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading=false
            })
        }
        
    }



}