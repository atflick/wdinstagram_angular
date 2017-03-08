let instaData = [
  {
    user: "Andy",
    comment: "Here is a pic of my dog",
    photoUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/hsdogdog-profile_image-5550ade194780dfc-300x300.jpeg"
  },
  {
    user: "Andy",
    comment: "Here is a pic of an apple",
    photoUrl: "http://www.kimmelorchard.org/img/icon_apple_gravenstein.png"
  },
  {
    user: "Ronny",
    comment: "Pic of a giraffe",
    photoUrl: "http://giraffestrategy.com/wp-content/uploads/2015/10/Giraffe_02-300x300.jpg"
  },
  {
    user: "Jimmy",
    comment: "here's what I ate last night #sogood",
    photoUrl: "http://images.familycircle.mdpcdn.com/sites/familycircle.com/files/styles/channel_masonry/public/cajun%20shrimp.jpg?itok=PTVX2yJK"
  },
]


angular
  .module("wdinstagram", ["ui.router"])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PostController", [
    "$stateParams",
    PostControllerFunction
  ])
  .controller("PostShowController", [
    "$stateParams",
    "$state",
    PostShowControllerFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
    .state("postIndex", {
      url: "/",
      templateUrl: "js/ng-views/post-index.html",
      controller: "PostController",
      controllerAs: "vm"
    })
    .state("postShow", {
      url: "post/:id",
      templateUrl: "js/ng-views/post-show.html",
      controller: "PostShowController",
      controllerAs: "vm"
    })
}

function PostControllerFunction($state, $stateParams){
  this.posts = instaData;

  this.addPost = function(){
    let post = {user: this.newPostUser, comment: this.newPostComment, photoUrl: this.newPostPhotoUrl};
    this.posts.push(post);
  }
}

function PostShowControllerFunction ($stateParams, $state){
  this.post = instaData[$stateParams.id];
  this.posts = instaData;
  this.delete = function(){
    this.posts.splice($stateParams.id, 1);
    $state.go("postIndex");
  }
}
