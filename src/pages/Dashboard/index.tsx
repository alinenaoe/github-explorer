/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import * as S from './styles';
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
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!searchedRepository) {
      setInputError(
        'Please type the name of the repository you are looking for :)',
      );
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${searchedRepository}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setSearchedRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Your search had no results :(');
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <S.Title>What&apos;s on on Github?</S.Title>
      <h2>Explore repositories, find projects!</h2>

      <S.Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Type here, e.g.: username/repository-name"
          value={searchedRepository}
          onChange={e => setSearchedRepository(e.target.value)}
        />
        <button type="submit">Search</button>
      </S.Form>

      {inputError && <S.Error>{inputError}</S.Error>}

      <S.Repositories>
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
      </S.Repositories>
    </>
  );
};

export default Dashboard;
