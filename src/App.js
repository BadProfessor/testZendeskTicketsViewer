import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const sub = process.env.REACT_APP_HOST;
const user = process.env.REACT_APP_USER;
const pass = process.env.REACT_APP_PASS;

const baseUrl = `https://${sub}.zendesk.com/api/v2/tickets.json`;
const basicAuth = {
  username: user,
  password: pass,
};

/////////////////////////////////////////////////// Change

const getTickets = (url) => {
  return axios({
    method: 'get',
    url: url,
    auth: basicAuth,
  }).then((res) => res);
};

const logErr = (err) => {
  if (err.res) {
    console.log(err.res.data);
    console.log(err.res.status);
    console.log(err.res.headers);
  } else if (err.req) {
    console.log(err.req);
  }
  console.log('Error: ', err.message);
  console.log(err.config);
  console.log(err.stack);
};

const sendTickets = async (req, res) => {
  try {
    let res = await getTickets(baseUrl);
    let tickets = res.data.tickets;
    while (res.data.next_page) {
      res = await getTickets(res.data.next_page);
      tickets = tickets.concat(res.data.tickets);
    }
    tickets = tickets.reverse(); // Recent First
    res.status(200).send(tickets);
    console.log(
      `Sent ${tickets.length} tickets to ${req.hostname} at ${Date()}.`
    );
  } catch (error) {
    logErr(error);
    res.status(error.res ? error.res.status : 500).send(`${error.message}`);
  }
};

/////////////////////////////////////////////////// Change

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let res = await getTickets(baseUrl);
      let tickets = res.data.tickets;
      while (res.data.next_page) {
        res = await getTickets(res.data.next_page);
        tickets = tickets.concat(res.data.tickets);
      }
      tickets = tickets.reverse();
      setPosts(tickets);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  console.log(posts);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Tickets</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
