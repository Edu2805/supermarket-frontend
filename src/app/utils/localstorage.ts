export class LocalStorageUtils {
    saveLocalDateUserRole(role: string) {
        this.saveUserRole(role);
    }
    
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

    public getUserRole(): string {
        return localStorage.getItem('devio.role');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public saveUserRole(role: string) {
        localStorage.setItem('devio.role', role);
    }

    public saveUser(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }

    public addRole(role: string) {
        let userEdit = JSON.parse(localStorage.getItem('devio.user'));
    
        userEdit = role;
        localStorage.setItem("devio.user", JSON.stringify(userEdit));
    }

}