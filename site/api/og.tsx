import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};
 
export default function (request: Request) {
  const url = new URL(request.url)

  const name = url.searchParams.get("name") ?? "Creature"
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          color: '#da6262',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {name}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}