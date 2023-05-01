import './style.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { authBackend, blogBackend } from '../../configs/axios';
import { useAppSelector } from '../../redux/hooks';
import { Avatar, Button, Container, Flex, Image, Paper, Skeleton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Prism } from '@mantine/prism';
import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import CommentSectionComponent from '../../components/CommentSection';

const BlogViewPage = () => {

  const { id: blogId } = useParams();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const user = useAppSelector((state) => state.user.data)

  const [blogData, setBlogData] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [blogDataToShow, setBlogDataToShow] = useState<any>("");
  const [createdAt, setCreatedAt] = useState("");
  const [author, setAuthor] = useState({ id: '', photoURL: '', name: "", privateAccount: false, loading: true })

  const getBlogDataFromServer = async () => {
    try {
      const { data } = await blogBackend.get(`/blog/${blogId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      setBlogData(data);
    } catch (error: any) {
      console.log(error)
      const msg = error.response.data.error ? error.response.data.error : "Oops faild to fetch Blog data";
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: msg
      });
    }
  };

  const getBlogAuthorData = async (id: string) => {
    try {
      const { data } = await authBackend.get(`/user/${id}`);
      setAuthor((pre) => { return { ...pre, ...data, loading: false } })
    } catch (error: any) {
      setAuthor((pre) => { return { ...pre, loading: false } })
      const msg = error.response.data.error ? error.response.data.error : "Oops faild to fetch author data";
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: msg
      });
    }
  }

  useEffect(() => {
    if (blogData?.body) {
      const htmlOfDelta = new QuillDeltaToHtmlConverter(blogData.body?.ops);
      const reactBody = parse(htmlOfDelta.convert(), {
        replace: (domNode: any) => {
          if (domNode.name === "pre" && domNode.children?.[0]?.data) {
            return <Prism language="javascript" sx={{ marginTop: "20px" }}>{domNode.children?.[0]?.data}</Prism>;
          }
        },
      });

      setBlogDataToShow(reactBody)
    }
    if (blogData?.title) setTitle(blogData?.title)
    if (blogData?.subtitle) setSubTitle(blogData?.subtitle)
    if (blogData?.bannerImgURL) setBannerImg(blogData?.bannerImgURL)
    if (blogData?.author) {
      setAuthor((pre) => { return { ...pre, id: blogData?.author } })
      getBlogAuthorData(blogData?.author)
    }
    if (blogData?.createdAt) setCreatedAt(blogData?.createdAt)
  }, [blogData])


  useEffect(() => {
    getBlogDataFromServer();
  }, [])

  return (
    <Container className='BlogViewPage'>
      <Image width="100%" height={400} src={bannerImg} withPlaceholder radius={5} />
      <br />
      <Paper withBorder p="md" className="user">
        <Flex align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={10}>
            {author.loading ? <Skeleton radius={'xl'} w={40} h={40} /> : <Avatar radius={'xl'} src={author?.photoURL} />}
            <div>
              {author.loading ? <Skeleton w={150} h={20} /> : <Text>{author?.name}</Text>}
              {author.loading ? <Skeleton mt={10} w={150} h={10} /> : ""}
            </div>
          </Flex>
          {author.loading ? <Skeleton w={100} h={40} /> : <Button variant='outline' color='indigo'>
            Follow
          </Button>}
        </Flex>
        {/* <Text>{createdAt}</Text> */}
      </Paper>
      {/* <br /> */}
      <h1>{title}</h1>
      <Text color="dimmed">{subtitle}</Text>
      <br />
      <div className="line"></div>
      <div className="body">
        {blogDataToShow ? blogDataToShow : <Skeleton w="100%" h={100} />}
      </div>
      <div className="line"></div>
      <CommentSectionComponent blogId={blogId} userId={user?.uid} />
    </Container>
  )
}

export default BlogViewPage
