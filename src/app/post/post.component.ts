import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postId: number = 0;
  public content: string | undefined = '';

  constructor(private route: ActivatedRoute, private postService: PostService) {
    route.params.subscribe(x => {
      this.postId = x['id'];
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.content = posts.find(x => x.ID == this.postId)?.post_content;
    });
  }

}
