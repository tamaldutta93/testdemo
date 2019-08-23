
export class LoginToken {

	public jwtToken : any;
	public token : any;
	public userId : any;
	public userData : any;
	 	
	 //Do the Needful
	 
	 addToken(thisToken : any){
		this.jwtToken = thisToken;
	 } 

	 getToken(){
		 return this.jwtToken;
	 }

}
