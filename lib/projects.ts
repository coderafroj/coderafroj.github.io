import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import type { Project, ProjectInput } from "./types";

const COLLECTION = "projects";

/** Subscribes to live project updates, ordered for display. Returns an unsubscribe fn. */
export function subscribeToProjects(
  onChange: (projects: Project[]) => void,
  onError?: (err: Error) => void
) {
  if (!isFirebaseConfigured || !db) {
    // No Firebase configured yet — caller falls back to seed data.
    onChange([]);
    return () => {};
  }

  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const projects = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Project, "id">),
      }));
      onChange(projects);
    },
    (err) => onError?.(err as Error)
  );
}

function requireDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Add your Firebase env vars first.");
  }
  return db;
}

export async function createProject(input: ProjectInput) {
  return addDoc(collection(requireDb(), COLLECTION), {
    ...input,
    createdAt: Date.now(),
    serverCreatedAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  return updateDoc(doc(requireDb(), COLLECTION, id), input);
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(requireDb(), COLLECTION, id));
}
