import React from "react";
import "./style.css";
import {
  Box,
  Card,
  Image,
  Heading,
  Text,
} from 'rebass';


// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

// export function ListItem({ children }) {
//   return <li className="list-group-item">{children}</li>;
// }

export function ListItem({
srcUrl,
heading,
text,
}) {
  return (
  <Box width={256}>
    <Card
      p={1}
      borderRadius={2}
      boxShadow='0 0 16px rgba(0, 0, 0, .25)'>
      <Image 
        borderRadius={2}
        src={srcUrl} />
      <Box px={2}>
        <Heading as='h3'>
          {heading}
        </Heading>
        <Text fontSize={0}>
          {text}
        </Text>
      </Box>
    </Card>
  </Box>
  );
}
