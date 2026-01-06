import { ref } from "vue"
import {
  getMyAppointmentsApi,
  deleteAppointmentApi,
} from "$src/api/appointments.service"

// ===== TYPES =====
export type UiAppointment = {
  id: number
  date: string
  time: string
  created_at: string

  // 🔥 унифицированное имя для отображения
  displayName: string

  // только если есть (для пациента)
  specialization?: string
}

// ===== STATE =====
const appointments = ref<UiAppointment[]>([])
const loading = ref(false)

// ❗ НЕ ТРОГАЕМ
const clientId = ref<number | null>(null)

// UX
const removingId = ref<number | null>(null)

export function useAppointments() {
  const role = ref<"client" | "doctor" | null>(null)

  // ===== FETCH =====
  const fetchMine = async () => {
    loading.value = true
    try {
      const res = await getMyAppointmentsApi()

      console.log("RAW RESPONSE:", res.data)

      // ❗ НЕ ТРОГАЕМ
      clientId.value =
        typeof res.data?.client_id === "number"
          ? res.data.client_id
          : null

      role.value = res.data?.role ?? null

      const list = Array.isArray(res.data?.appointments)
        ? res.data.appointments
        : []

        appointments.value = list.map((a: any) => {
          const [datePart, timePart] = a.starting_at.split(" ")
        
          const displayName =
            a.doctor?.user
              ? `${a.doctor.user.name} ${a.doctor.user.surname}`
              : a.client?.user
                ? `${a.client.user.name} ${a.client.user.surname}`
                : "—"
        
          return {
            id: a.id,
            date: datePart,
            time: timePart.slice(0, 5),
            created_at: a.created_at ?? a.starting_at,
            displayName,
            specialization: a.doctor?.specialization,
          }
        })
    } catch (e) {
      console.error("FETCH APPOINTMENTS ERROR", e)
      appointments.value = []
      clientId.value = null
    } finally {
      loading.value = false
    }
  }

  // ===== DELETE =====
  const remove = async (id: number) => {
    if (removingId.value === id) return
    removingId.value = id

    try {
      await deleteAppointmentApi(id)
      appointments.value = appointments.value.filter(
        (a) => a.id !== id
      )
    } catch {
      alert("Nie udało się anulować wizyty ❌")
    } finally {
      removingId.value = null
    }
  }

  return {
    appointments,
    loading,
    clientId,   // ✅ ОСТАВИЛИ
    removingId,
    role,
    fetchMine,
    remove,
  }
}
