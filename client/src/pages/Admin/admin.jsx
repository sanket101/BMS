import { Tabs } from 'antd';

import MovieList from "./movieList";
import TheatresTable from "./theatresTable";

const Admin = () => {
    const tabItem = [
        {
          key: "1",
          label: "Movies",
          children: <MovieList />
        },
        {
          key: "2",
          label: "Theatres",
          children: <TheatresTable />
        }
      ]
    
      return (
        <div>
          <h1>Admin Page</h1>
          <Tabs items={tabItem} />
        </div>
      )
};

export default Admin;