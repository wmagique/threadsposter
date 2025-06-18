"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, Trash2 } from "lucide-react"

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "destructive" | "default"
  onConfirm: () => void
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "default",
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800/95 backdrop-blur-md border-slate-600/50 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 text-xl">
            {variant === "destructive" ? (
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <Trash2 className="w-5 h-5 text-blue-400" />
              </div>
            )}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:border-slate-500 transition-all duration-300">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              variant === "destructive"
                ? "bg-red-600/80 hover:bg-red-500 border-0 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                : "bg-blue-600/80 hover:bg-blue-500 border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
