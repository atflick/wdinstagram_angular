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
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostController", [
    "$stateParams",
    "$state",
    "PostFactory",
    PostControllerFunction
  ])
  .controller("PostShowController", [
    "$stateParams",
    "$state",
    "PostFactory",
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

function PostFactoryFunction($resource){
  return $resource("http://localhost:3000/entries/:id", {}, {
    update: { method: "PUT" }
  })
}

function PostControllerFunction($stateParams, $state, PostFactory){
  this.posts = PostFactory.query();
  this.post = new PostFactory();
  this.addPost = function(){
    this.post.$save(function(post){
      $state.go("postShow", {id: post.id});
    });

  }
}

function PostShowControllerFunction ($stateParams, $state, PostFactory){
  this.post = PostFactory.get({id: $stateParams.id});
  this.update = function(){
    this.post.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.post.$delete({id: $stateParams.id}, function(){
      $state.go("postIndex");
    })
  }
}
