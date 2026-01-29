export interface ContactFormData {
  fullName: string
  email: string
  subject: string
  message: string
}

export interface ContactFormResponse {
  next: string
  ok: boolean
}
