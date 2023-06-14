import { Component } from 'react';

import '../Home/styles.css';

import {loadPosts} from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component{
state={
  posts: [],
  allPosts: [], 
  page:0,
  postPerPage: 2,
  searchValue:''
};

loadMorePosts = () => {
  const{
    page,
    postPerPage,
    allPosts,
    posts
  } = this.state;
  const nextpage = page+postPerPage
  const nextpost = allPosts.slice(nextpage,nextpage + postPerPage)
  posts.push(...nextpost);

  this.setState({posts,page:nextpage});
}

 async componentDidMount(){
  await this.loadPosts();
}

loadPosts = async() => {
  const {page, postPerPage} = this.state;
  const postAndPhotos = await loadPosts ();
  this.setState ({ 
    posts: postAndPhotos.slice(page,postPerPage),
    allPosts: postAndPhotos})
}

handleChange = (e) =>{
  const {value} = e.target;
  this.setState ({searchValue : value});
}


render(){
  const {posts,page,postPerPage,allPosts, searchValue} = this.state;
  const noMorePosts = page+postPerPage>= allPosts.length;


  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase());
  }) 
  : posts;


return(
  <section className="container">
    <div class="search-container">
    {!!searchValue && (
      <h1>{searchValue}</h1>
    )}
    <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
    </div>
  
  {filteredPosts.length > 0 &&( 
  <Posts posts ={filteredPosts}/>
  )}

  {filteredPosts.length === 0 &&( 
  <p>Não foi encontrado</p>
  )}

  <div className='button-container'>
  {!searchValue &&(
        <Button 
        text='Load more Posts'
        onclick={this.loadMorePosts}
        disabled={noMorePosts}
    />
  )}
 
  
  </div>
  
  </section>
);}
}

export default Home;
