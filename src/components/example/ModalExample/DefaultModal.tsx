'use client'

import { useModal } from '@/hooks/useModal'
import Button from '../../ui/button/Button'
import { Modal } from '../../ui/modal'

export default function DefaultModal({ text }: { text: string }) {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div>
      <div title="Default Modal">
        <Button
          size="sm"
          onClick={openModal}
          className="bg-transparent hover:bg-transparent"
        >
          ....
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[600px] p-5 lg:p-10"
        >
          <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
            ChangeLog
          </h4>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            {text}
          </p>
        </Modal>
      </div>
    </div>
  )
}
