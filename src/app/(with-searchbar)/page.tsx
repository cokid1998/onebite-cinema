import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

async function RecoMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!res.ok) return <div>오류가 발생했습니다.</div>;

  const recoMovies: MovieData[] = await res.json();

  return (
    <>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

async function AllMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const allMovies: MovieData[] = await res.json();
  return (
    <>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_conatiner}>
          <RecoMovies />
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          <AllMovies />
        </div>
      </section>
    </div>
  );
}
