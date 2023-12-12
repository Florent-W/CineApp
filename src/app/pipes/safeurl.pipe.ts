import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    const videoId = this.extractIdVideo(url);
    const newVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(newVideoUrl);
  }

  private extractIdVideo(url: string): string {
    const linkYoutube = 'https://www.youtube.com/watch?v=';
    if (url.startsWith(linkYoutube)) {
      return url.substring(linkYoutube.length);
    }
    return '';
  }
}
