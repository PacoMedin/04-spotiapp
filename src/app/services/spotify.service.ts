import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient) {

    console.log('Spotify service listo!!!');
  }

  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDD5fNfFuvAmCe7GcwBpiBY-t7ofPhhSFYAsp0mCnHDFgDSl88oaDH05sUFT2IKX22f0Ygu8lsH0EC-prg'
    });

    return this.http.get(url, { headers });

  }

  getNewRelases() {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQAouZ8sjsNbuFWyoPnzu1p5DB4dMr9P8sty7YDxaxCc_wVQB8Ef2xRH8O2FeZW5YxsCjaVVV3G2Jd_qjWs'
    // });

    // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=30', { headers })
    //   .pipe(map(data => data['albums'].items));
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQAouZ8sjsNbuFWyoPnzu1p5DB4dMr9P8sty7YDxaxCc_wVQB8Ef2xRH8O2FeZW5YxsCjaVVV3G2Jd_qjWs'
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
    //   .pipe(map(data => data['artists'].items));
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));


  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    //.pipe( map( data => data['artists'].items));

  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
      .pipe(map(data => data['tracks']));
  }

}
