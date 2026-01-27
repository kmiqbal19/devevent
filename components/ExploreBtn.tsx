'use client';
import Image from 'next/image';

const ExploreBtn = () => {
  return (
    <button
      type="button"
      className="mt-7 mx-auto"
      id="explore-btn"
      onClick={() => console.log('CLICKED')}
    >
      <a href="/join">
        Get Involved
        <Image
          src="/icons/arrow-down.svg"
          alt="down arrow"
          width={16}
          height={16}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;
