import Link from "next/link";
import CreatePost from "./CreatePost";
import styles from "./page.module.css";

// pocketbase data 가져오기
async function getPost(){
     const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records', {cache: 'no-store' });
     const data = await res.json();
     return data?.items as any[];

}
const PostsPage = async() => {
     const posts = await getPost();
  return (
    <div>
     <h1 className={styles.h1}>Posts</h1>
          {posts?.map((post)=>{
                    return <PostItem key={post.id} post={post} />
          })}
          <CreatePost />
    </div>
  )
}

export default PostsPage;

const PostItem =({ post }:any ) => {
     const {id, title, created} = post || {};
     return(
          <Link href={`/posts/${id}`}>
               <div className={styles.container}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.ptext}>{created}</p>
               </div>
          </Link>
     )
}