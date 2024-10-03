import React, { useState } from 'react';
import PedestalItem from '@/shared/components/PedestalItem/PedestalItem';
import { useWindowSize } from '@/shared/hooks/useWindowSize';

const Pedestal = ({ data }: { data: any }) => {
  const dimensions = useWindowSize();
  const [activePlace, setActivePlace] = useState(0);

  if (!data || data.length < 3) return <></>;
  return (
    <div style={{ width: '100%' }}>
      {dimensions.width >= 700 ? (
        <div className="boxPedestal">
          <PedestalItem data={data[1]} />
          <PedestalItem data={data[0]} />
          <PedestalItem data={data[2]} />
        </div>
      ) : (
        <>
          <div
            className="scrollContainer"
            style={{ display: 'flex' }}
            id="container"
          >
            <button
              className="buttonArrow"
              onClick={() => {
                setActivePlace(activePlace - 1);
              }}
              disabled={activePlace === 0}
            >
              ‹
            </button>
            {
              // @ts-ignore
              data.map((item, index) => {
                return (
                  index === activePlace && (
                    <PedestalItem key={index} data={item} />
                  )
                );
              })
            }
            <button
              className="buttonArrow"
              onClick={() => {
                setActivePlace(activePlace + 1);
              }}
              disabled={data.length - 1 === activePlace}
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pedestal;
