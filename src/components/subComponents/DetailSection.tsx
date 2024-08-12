// DetailBoxAndSearch.tsx

import React from 'react';
import styled from '@emotion/styled';

// Define styled components for each element
const Section = styled.section`
position: relative;
  padding: 90px 0;
  background: url('https://aradatech.com/wp-content/uploads/2024/08/Untitled-design-1.png') no-repeat center center/cover;

  `;

const Container = styled.div`
  max-width: 1140p  x;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const DetailBox = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #fff;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  flex: 2;
  margin-right: 15px;

  &:last-of-type {
    margin-right: 0;
    flex:1;
  }
`;

const FormControl = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CenteredButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;


interface DetailBoxAndSearchProps {
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}




// Define the React component
const DetailBoxAndSearch: React.FC<DetailBoxAndSearchProps> = ({setIsDialogOpen}) => {
  return (
    <Section>
      <Container>
        <Row>
          <DetailBox>
            <Heading>
            Music for Every Mood 
            </Heading>
            <Paragraph>
                Find the perfect song for your mood. search for your favorite song and enjoy the music.
            </Paragraph>
          </DetailBox>
        </Row>
        <FormContainer>
          <form>
            <FormRow>
              <FormGroup>
                <FormControl type="text" placeholder="Keywords" />
              </FormGroup>
              <FormGroup>
                <FormSelect>
                  <option value="title">Music Title</option>
                  <option value="genre">Genre</option>
                  <option value="album">Album</option>
                </FormSelect>
              </FormGroup>              
              
                <Button type="submit">Search</Button>
            </FormRow>
          </form>
          

    <CenteredButton  onClick={() => setIsDialogOpen(true)} >+ Add Song</CenteredButton>
           
        </FormContainer>
      </Container>
    </Section>
  );
};

export default DetailBoxAndSearch;