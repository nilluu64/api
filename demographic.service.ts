import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemographicService {

  constructor(private http: HttpClient) { }

  postDemographic(data:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    return this.http.post<any>('https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/demographic/add',data,httpOptions);
  }

  getDemographic(masterKey?: any){
    console.log('from service',masterKey);
    return this.http.get<any>("https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/demographic/get/"+masterKey);
  }
  
  getparentIdentityPrimaryKey(parentIdentityPrimaryKey?:any){
   return this.http.get("https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/files/"+parentIdentityPrimaryKey);
  }

  getparentIdentitySecondaryKey(parentIdentitySecondaryKey?:any){
   return this.http.get("https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/files/"+parentIdentitySecondaryKey);
  }

  getCoParentIdentityPrimaryKey(coParentIdentityCoPrimaryKey?:any){
   return this.http.get("https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/files/"+coParentIdentityCoPrimaryKey);
  }

  getCoParentIdentitySecondaryKey(coParentIdentitySecondaryKey?:any){
    console.log('from service File key',coParentIdentitySecondaryKey);
   return this.http.get("https://qvulllj0r2.execute-api.us-east-1.amazonaws.com/dhs/files/"+coParentIdentitySecondaryKey);
  }

}
