import React, { Component } from 'react';
import { getMovies } from '../services/movieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pagesize: 4,
        currentpage:1
    };

    handlePageChange = page => {
        this.setState({currentpage:page});
    };
    handleDelete = movie => {
        const movies = this.state.movies.filter(x => x._id !== movie._id);
        this.setState({ movies: movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].likedOrNot = !movies[index].likedOrNot;
        this.setState({ movies });
    };
    render() {
        const {length:count}=this.state.movies;
        const {pagesize, currentpage, movies:allmovies}=this.state;
       
        if (this.state.movies.length === 0)
            return <h2>There are no movies in the Database</h2>;

            const movies=paginate(allmovies,currentpage,pagesize);

        return (<React.Fragment>
            <h3>Showing {this.state.movies.length} movies from the database</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movies => (<tr key={movies._id}>
                        <td>{movies.title}</td>
                        <td>{movies.genre.name}</td>                 
                        <td><Like liked={movies.likedOrNot} onClick={() => this.handleLike(movies)} /></td>
                        <td>
                            <button onClick={() => this.handleDelete(movies)} type="button" className="btn btn-small btn-danger">Delete</button>
                        </td>
                    </tr>))}

                </tbody>
            </table>
            <Pagination
            itemsCount={count}
            pageSize={pagesize}
            currnetPage={currentpage}
            onPageChange={this.handlePageChange}>
            </Pagination>
        </React.Fragment>
        )
    };
}

export default Movies;
