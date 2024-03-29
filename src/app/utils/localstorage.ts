export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('devio.user'));
    }

    public saveLocalDataUser(response: any) {
        this.saveUser(response);
    }

    public saveLocalDataToken(response: any) {
        this.saveUserToken(response.token);
    }

    public clearUserLocationData() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
        localStorage.removeItem('devio.role');
    }

    public getUserToken(): string {
        return localStorage.getItem('devio.token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }

}