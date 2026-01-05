import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

// Formats a byte size into a human‑readable string (e.g., 1.23 MB)
function formatSize(bytes: number): string {
  if (typeof bytes !== "number" || !isFinite(bytes) || bytes < 0) return ""
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"] as const
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024))
  )
  const value = bytes / Math.pow(1024, i)
  const precision = value >= 100 ? 0 : value >= 10 ? 1 : 2
  return `${value.toFixed(precision)} ${units[i]}`
}

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void
}

const FileUpload = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null
      onFileSelect?.(file)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024
  })

  const file = acceptedFiles[0] || null

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">


          {file ? (
            <div className={"uploader-selected-file"} onClick={(e) => e.stopPropagation()}>
              <img src={"/images/pdf.png"} alt="Pdf" className="size-10" />
              <div className="flex items-center space-x-3">

                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileSelect?.(null)
                }}>

                <img src="/icons/cross.svg" alt="Remove" className="size-4" />
              </button>

            </div>

          ) : (
            <>
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <img src="/icons/info.svg" alt="Upload" className="size-20" />
            </div>
            <div className="text-center text-gray-500 space-y-1">
              <p className="text-lg">
                <span className="font-semibold">Click to upload</span> or Drag and drop files here.
              </p>
              <p className="text-lg">PDF (max 20 mb)</p>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload
