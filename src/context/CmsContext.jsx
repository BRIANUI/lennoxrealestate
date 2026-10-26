import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  addDoc, 
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

const CmsContext = createContext(undefined);

export const CmsProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Clean up legacy mock listings from Firestore
  const cleanupMockData = async () => {
    try {
      const mockPropIds = ["1", "2", "3", "4", "5", "6", "7"];
      const mockBlogIds = ["1", "2", "3"];

      for (const id of mockPropIds) {
        await deleteDoc(doc(db, "lennox_properties", id)).catch(() => {});
      }
      for (const id of mockBlogIds) {
        await deleteDoc(doc(db, "lennox_blogPosts", id)).catch(() => {});
      }
    } catch (error) {
      console.error("Cleanup mock data notice:", error);
    }
  };

  useEffect(() => {
    cleanupMockData().then(() => {
      const unsubProperties = onSnapshot(
        collection(db, "lennox_properties"),
        (snap) => {
          const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
          // Sort newest first: use createdAt timestamp if available, else listedDate string
          list.sort((a, b) => {
            const getTime = (p) => {
              if (p.createdAt?.seconds) return p.createdAt.seconds;
              if (p.listedDate) return new Date(p.listedDate).getTime() / 1000;
              return 0;
            };
            return getTime(b) - getTime(a);
          });
          setProperties(list);
        },
        (err) => {
          console.error("Error fetching properties:", err);
        }
      );

      const unsubBlogs = onSnapshot(
        collection(db, "lennox_blogPosts"),
        (snap) => {
          const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
          setBlogPosts(list);
          setIsLoading(false);
        },
        (err) => {
          console.error("Error fetching blogs:", err);
          setIsLoading(false);
        }
      );

      return () => {
        unsubProperties();
        unsubBlogs();
      };
    });
  }, []);

  const holidayProperties = useMemo(() => {
    return properties.filter((p) => p.type === "Holiday" || (p.type === "Rent" && p.propertyType === "Cottage"));
  }, [properties]);

  const addProperty = async (property) => {
    const docRef = await addDoc(collection(db, "lennox_properties"), {
      ...property,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  };

  const updateProperty = async (id, updatedFields) => {
    await updateDoc(doc(db, "lennox_properties", id), updatedFields);
  };

  const deleteProperty = async (id) => {
    await deleteDoc(doc(db, "lennox_properties", id));
  };

  const addBlogPost = async (post) => {
    const docRef = await addDoc(collection(db, "lennox_blogPosts"), post);
    return docRef.id;
  };

  const updateBlogPost = async (id, updatedFields) => {
    await updateDoc(doc(db, "lennox_blogPosts", id), updatedFields);
  };

  const deleteBlogPost = async (id) => {
    await deleteDoc(doc(db, "lennox_blogPosts", id));
  };

  return (
    <CmsContext.Provider
      value={{
        properties,
        holidayProperties,
        blogPosts,
        addProperty,
        updateProperty,
        deleteProperty,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        isLoading
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
};
