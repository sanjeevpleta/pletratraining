import firebase from 'firebase';

@Injectable()
export class ProfileProvider {

    public userProfile: firebase.database.Reference;
	public user_id= Array<any> = null;
	public user_ref:any;
	public eventId:string;
	public usid:string;
    public currentUser: firebase.User;
	
  constructor() {
        }


  getID(){
   //  this.user_ref= firebase.database().ref(`/uid`);
     this.user_ref= firebase.database().ref();
	 user_ref.on('value', snap => {
	 this.user_id = [];
	 snap.forEach(data=>{
	  this.user_id.push({
	  //  eventId: data.key;
		usid:data.uid;
        		
	 });
	}); 
   });
}
}   
 
  
  
  