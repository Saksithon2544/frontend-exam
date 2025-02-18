import React from 'react';
import VirtualizedList from '@/components/VirtualizedList';
import InfiniteScroll from '@/components/InfiniteScroll';

const Dashboard = () => {
    return (
    <div>
      <div>
        <VirtualizedList />
      </div>

      <div>
        <InfiniteScroll />
      </div>
    </div>
    );
};

export default Dashboard;
