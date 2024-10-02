import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const decodedToken = jwtDecode<JwtPayload>(this.getToken());
    return decodedToken;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const expiresAt = decodedToken?.exp ? decodedToken?.exp * 1000 : 0;
    return expiresAt < Date.now();
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
