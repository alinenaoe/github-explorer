/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [searchedRepository, setSearchedRepository] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${searchedRepository}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
    setSearchedRepository('');
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>What&apos;s on on Github?</Title>
      <h2>Explore repositories, find projects!</h2>

      <Form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Type here the repository name"
          value={searchedRepository}
          onChange={e => setSearchedRepository(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="https://github.com/alinenaoe">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
