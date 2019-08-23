
export class Path {
public API_PATH: string;
public API_IMAGE_PATH: string;
public LIST_MESSAGE: string;

public adminLoginStatus: boolean;

    constructor() {
        this.API_PATH           =   'http://192.168.0.30:8080/api/';
        this.API_IMAGE_PATH     =   'http://192.168.0.30:8080/uploads/';

        this.adminLoginStatus   =   false;
    }
}
