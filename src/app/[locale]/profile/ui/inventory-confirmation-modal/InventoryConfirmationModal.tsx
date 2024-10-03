/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ModalPortal from '@/shared/components/ModalPortal/ModalPortal';
import { createRef, Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import useOutsideClick from '@/shared/hooks/useOutsideClick';

export const InventoryConfirmationModal = ({
  onClose,
  onAccept,
  modalTitle,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  onAccept: () => {};
  modalTitle: string;
}) => {
  const t = useTranslations('Profile.Table.Inventory.Modal');
  const ref = createRef<HTMLDivElement>();
  useOutsideClick(ref, onClose);

  return (
    <ModalPortal>
      <div className="modal modalActive" style={{ zIndex: 100 }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0px',
            right: '0px',
          }}
        ></div>
        <div ref={ref} className="modalContent mountedStyle modalContentActive">
          <div className="modalBackground"></div>
          <div className="confirmation">
            <div className="modalHeaderSmallBottom">
              <h3 className="modalHeaderTitle">{modalTitle}</h3>
              <div className="boxCloseIconHeaderTitle">
                <div
                  className="boxCloseIconHeaderTitle"
                  onClick={() => onClose(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Remove cr-fr">
                      <path
                        id="Shape"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                        fill="#8774B8"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="content">
              <button
                onClick={() => onClose(false)}
                className="btn lightBtn confirmationBtn mb"
              >
                {t('decline')}
              </button>
              <button
                onClick={() => onAccept()}
                className="btn blackBtn confirmationBtn"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
