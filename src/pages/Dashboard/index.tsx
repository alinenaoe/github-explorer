import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>What&apos;s on on Github?</Title>
      <h2>Explore repositories, find projects!</h2>

      <Form>
        <input type="text" placeholder="Type here the repository name" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="https://github.com/alinenaoe">
          <img
            src="https://avatars0.githubusercontent.com/u/33556958?s=400&u=621ac119698e36911bd1d9518cf26dc66678041d&v=4"
            alt="Foto de perfil"
          />
          <div>
            <strong>Repository title</strong>
            <p>Description</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
