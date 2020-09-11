import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import * as S from './styles';
import logo from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <S.Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Back
        </Link>
      </S.Header>
      <S.RepositoryInfo>
        <header>
          <img
            src="https://avatars0.githubusercontent.com/u/33556958?s=460&u=621ac119698e36911bd1d9518cf26dc66678041d&v=4"
            alt="perfil"
          />
          <div>
            <strong>username/repository</strong>
            <p>description</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>100</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>100</strong>
            <span>forks</span>
          </li>
          <li>
            <strong>100</strong>
            <span>opened issues</span>
          </li>
        </ul>
      </S.RepositoryInfo>

      <S.Issues>
        <Link to="repository">
          <div>
            <strong>Repository</strong>
            <p>Author</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </S.Issues>
    </>
  );
};

export default Repository;
