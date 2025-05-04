import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../states/leaderboard/action';
import LeaderboardSkeleton from '../components/LeaderboardSkeleton';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((states) => states.leaderboard);
  const isLoading = useSelector((states) => states.isLoading);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, []);

  return (
    <div className="card p-6 w-full lg:w-2/3 bg-base-200 card-md shadow-md mt-6 mb-32 mx-auto">
      <p className="font-bold text-lg">Klasmen Pengguna Aktif</p>

      <div className="flex justify-between items-center mt-4">
        <div className="font-semibold text-base">Pengguna</div>
        <div className="font-semibold text-base">Skor</div>
      </div>

      {isLoading.skeleton ? (
        <>
          <LeaderboardSkeleton key={1} />
          <LeaderboardSkeleton key={2} />
          <LeaderboardSkeleton key={3} />
          <LeaderboardSkeleton key={4} />
          <LeaderboardSkeleton key={5} />
          <LeaderboardSkeleton key={6} />
          <LeaderboardSkeleton key={7} />
          <LeaderboardSkeleton key={8} />
          <LeaderboardSkeleton key={9} />
          <LeaderboardSkeleton key={10} />
        </>
      ) : (
        leaderboard?.map((item) => (
          <div
            key={item.user.id}
            className="flex justify-between items-center border-b border-base-300 py-4"
          >
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
                  <img src={item.user.avatar} />
                </div>
              </div>
              <div>
                <span className="block font-bold text-lg">{item.user.name}</span>
                <span className="block text-sm text-neutral-content">{item.user.email}</span>
              </div>
            </div>
            <span className="text-lg font-bold">{item.score}</span>
          </div>
        ))
      )}
    </div>
  );
}
