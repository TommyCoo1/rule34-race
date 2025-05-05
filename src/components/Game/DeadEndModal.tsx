import { Post } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../UI/dialog"
import { Button } from "../UI/button"

export function DeadEndModal({
    options,
    onPick,
    onClose
  }: {
    options: Post[] | null
    onPick: (p: Post) => void
    onClose: () => void
  }) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle>Dead end – choose your rescue!</DialogTitle>
          </DialogHeader>
  
          {options && options.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {options.map(p => (
                <img
                  key={p.id}
                  src={p.file_url}
                  alt={p.tags}
                  onClick={() => onPick(p)}
                  className="cursor-pointer rounded-lg hover:ring-2 hover:ring-accent"
                />
              ))}
            </div>
          ) : (
            <p>No related posts found. Pick another tag.</p>
          )}
  
          <Button variant="secondary" onClick={onClose} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
  