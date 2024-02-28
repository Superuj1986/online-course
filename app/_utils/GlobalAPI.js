const { gql, default: request } = require("graphql-request")

const MASTER_URL = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

const getAllCourseList=async()=>{
    const query=gql`
    query MyQuery {
        courseLists(first: 20, orderBy: createdAt_DESC) {
          author
          name
          id
          free
          description
          demoUrl
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          totalChapers
          sourceCode
          tag
          slug
        }
      }
      
    `
    const result = await request(MASTER_URL,query);
    return result;
}
const getSideBanner=async()=>{
  const query=gql`
  query getSideBanner {
    sideBanners {
      id
      name
      banner {
        id
        url
      }
      url
    }
  }  
  `
  const result = await request(MASTER_URL,query);
  return result;
}
const getCoursebyId=async(courseId)=>{
  const query=gql`
  query MyQuery {
    courseList(where: {slug: "`+courseId+`"}) {
      author
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          video {
            url
          }
        }
      }
      demoUrl
      description
      free
      id
      name
      slug
      sourceCode
      tag
      totalChapers
    }
  }
  
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const enrolltoCourse=async(courseId,email)=>{
  const query=gql`
  mutation MyMutation {
    createUserEnrollCourse(
      data: {courseId: "`+courseId+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrollCoursesConnection {
      edges {
        node {
          id
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const checkUser=async(courseId,email)=>{
  const query=gql`
  query MyQuery {
    userEnrollCourses(where: {courseId: "`+courseId+`", userEmail: "`+email+`"}) {
      id
    }
  }`
  const result = await request(MASTER_URL,query);
  return result;
}

const getEnrolledCourse=async(id,email)=>{
  const query=gql`
  query MyQuery {
    userEnrollCourses(where: {id: "`+id+`", userEmail: "`+email+`"}) {
      courseId
      id
      userEmail
      completedChapter {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
      courseList {
        author
        banner {
          url
        }
        chapter(first: 50) {
          ... on Chapter {
            id
            name
            shortDesc
            video {
              url
            }
          }
        }
        demoUrl
        description
        free
        id
        name
        slug
        sourceCode
        totalChapers
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const markCompletedChapter=async(enrollId,chapterId)=>{
  const query=gql`
  mutation MyMutation {
    updateUserEnrollCourse(
      data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "`+chapterId+`"}}}}}
      where: {id: "`+enrollId+`"}
    ){
      id
    }
    publishUserEnrollCourse(where: {id: "`+enrollId+`"}) {
      id
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

export default{
    getAllCourseList,
    getSideBanner,
    getCoursebyId,
    enrolltoCourse,
    checkUser,
    getEnrolledCourse,
    markCompletedChapter,
}