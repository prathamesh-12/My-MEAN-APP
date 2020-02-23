import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { PageEvent } from "@angular/material";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  totalPosts = 10;
  postsPerPage = 3;
  pageSizeOptions = [1, this.postsPerPage, 10, 50];
  currentPage = 1;
  isLoading = false;
  private postsSub: Subscription;
  private authStatusSubscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(public postsService: PostsService, private _authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postsData: {posts: Post[], count: number}) => {
        this.isLoading = false;
        this.posts = postsData.posts;
        this.totalPosts = postsData.count;
      });

    this.authStatusSubscription = this._authService.getUserAuthStatus().subscribe(isAuthFlag => {
      this.isAuthenticated = isAuthFlag;
    })
  }

  onPageChanged(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.postsPerPage = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }
}
