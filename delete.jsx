import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  color: white;

  a:visited {
    color: white;
  }
`;

const Delete = (props) => {
  const { id, postList, setuserPosts, setPostList, mainPageList } = props;
  const deleteHandler = async (postToDelete) => {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2302-acc-ct-WEB-PT/posts/${postToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwttoken}`,
        },
      }
    );
    const data = await response.json();
      console.log(data)
      console.log(postList)
      console.log(mainPageList)
    if (data) {
      const newPosts = postList.filter((post) => {
        return post._id !== postToDelete;
      });
      const newMain = mainPageList.filter((post) => {
        return post._id !== postToDelete;
      });
      setuserPosts(newPosts);
      setPostList(newMain);
    }
  };
  return (
    <div>
    <Button
        type="button"
        className="deletebttn"
        onClick={() => deleteHandler(id)}
      >
        <DeleteForeverRoundedIcon
          style={{ color: "white", fontSize: 30 }}
        ></DeleteForeverRoundedIcon>{" "}
      </Button>
      </div>
  );
};

export default Delete;