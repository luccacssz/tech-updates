'use client'
import { useModal } from '@/hooks/useModal'
import { marked } from 'marked'
import Button from '../../ui/button/Button'
import { Modal } from '../../ui/modal'

export default function FullScreenModal({ text }: { text: string }) {
  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal()

  const renderMarkdownToHtml = marked(text)
  return (
    <div title="Changelog details" className="cursor-default ">
      <Button
        size="sm"
        onClick={openFullscreenModal}
        className="bg-transparent hover:bg-transparent"
      >
        ....
      </Button>
      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        isFullscreen={true}
        showCloseButton={true}
      >
        <div className=" fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-10">
          <div>
            <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
              ChangeLog
            </h4>
            <div
              className="text-sm leading-6 text-gray-500 dark:text-gray-400 flex flex-col items-start gap-4 [&>ul]:flex [&>ul]:flex-col [&>ul]:items-start"
              dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
