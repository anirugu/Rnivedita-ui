import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { Post } from '../Post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  public posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().pipe(takeUntil(this.ngUnsubscribe)).subscribe((post) => {
      this.posts = post;
    }, () => {
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
