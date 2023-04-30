import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { blogBackend } from '../../configs/axios';
import { useAppSelector } from '../../redux/hooks';
import { Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Prism } from '@mantine/prism';
import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const BlogViewPage = () => {

  const { id: blogId } = useParams();
  const accessToken = useAppSelector((state) => state.user.accessToken)

  const [blogData, setBlogData] = useState<any>(null);
  const [blogDataToShow, setBlogDataToShow] = useState<any>("")

  const getBlogDataFromServer = async () => {
    try {
      const { data } = await blogBackend.get(`/blog/${blogId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      setBlogData(data);
    } catch (error: any) {
      const msg = error.response.data.error ? error.response.data.error : "Oops faild to fetch Blog data";
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: msg
      });
    }
  };


  useEffect(() => {


    if (blogData?.body) {
      const htmlOfDelta = new QuillDeltaToHtmlConverter(blogData.body)
      const reactBody = parse(htmlOfDelta.convert(), {
        replace: (domNode: any) => {
          if (domNode.name === "pre" && domNode.children?.[0]?.data) {
            return <Prism language="javascript">{domNode.children?.[0]?.data}</Prism>;
          }
        },
      });

      setBlogDataToShow(reactBody)
    }
  }, [blogData])

  useEffect(() => {
    getBlogDataFromServer();
  }, [])

  return (
    <Container>
      {blogDataToShow}
    </Container>
  )
}

export default BlogViewPage
