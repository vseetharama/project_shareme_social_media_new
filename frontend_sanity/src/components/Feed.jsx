import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client
        .fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch pins:', err);
          setLoading(false);
        });
    } else {
      setLoading(true);
      client
        .fetch(feedQuery)
        .then((data) => {
          console.log('Fetched pins:', data);
          setPins(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch feed:', err);
          setLoading(false);
        });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';

  if (loading) {
    return <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />;
  }

  if (!pins || pins.length === 0) {
    return <div className="flex justify-center items-center h-full"><p>No pins found. Start creating!</p></div>;
  }

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Feed;
