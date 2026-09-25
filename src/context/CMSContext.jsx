import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  header: {
    phone: "(216) 555-7586",
    displayPhone: "(216) 555-PLUMB",
    emergencyBadge: "24/7 Emergency Service",
    licenseNumber: "OH Lic #PL-48291",
    tagline: "Northeast Ohio's #1 Rated Local Plumber"
  },
  hero: {
    headline: "Northeast Ohio's Most Trusted Plumbers",
    subheadline: "Fast 30-minute emergency dispatch, 100% upfront transparent pricing, and guaranteed plumbing solutions for home & business.",
    heroImage: "/images/hero_plumber.png",
    ratingScore: "4.9",
    totalReviews: "1,250+"
  },
  dispatchSettings: {
    plumberEmail: "dispatch@americanplumbing-ohio.com",
    plumberPhone: "(216) 555-7586",
    avgResponseMinutes: "15"
  },
  services: [
    {
      id: "water-heater",
      title: "Water Heater Repair & Tankless",
      price: "$149 - $899",
      emergency: true,
      description: "No hot water? Leaking tank? Complete repair, tankless upgrades, and flush maintenance."
    },
    {
      id: "drain-cleaning",
      title: "Drain Cleaning & Hydro-Jetting",
      price: "$99 - $349",
      emergency: true,
      description: "Clears severe main line clogs, grease buildup, tree roots, and slow shower drains fast."
    },
    {
      id: "pipe-leak",
      title: "Burst Pipe & Emergency Leak Repair",
      price: "$129 - $499",
      emergency: true,
      description: "24/7 emergency water shut-off, copper pipe patching, leak detection, and ceiling repairs."
    },
    {
      id: "sewer-line",
      title: "Sewer Line Camera Inspection",
      price: "$189 - $799",
      emergency: false,
      description: "High-definition video pipe locator and trenchless sewer pipe lining options."
    },
    {
      id: "toilet-faucet",
      title: "Toilet, Faucet & Fixture Install",
      price: "$89 - $299",
      emergency: false,
      description: "Running toilet repair, high-efficiency upgrades, garbage disposals, and sink faucet replacement."
    },
    {
      id: "gas-line",
      title: "Gas Line Repair & Inspection",
      price: "$199 - $649",
      emergency: true,
      description: "Certified gas leak detection, appliance hookups, and pressure testing for safety compliance."
    }
  ]
};

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('american_plumbing_cms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultContent; }
    }
    return defaultContent;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('american_plumbing_admin_auth') === 'true';
  });

  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('american_plumbing_leads');
    if (savedLeads) {
      try { return JSON.parse(savedLeads); } catch (e) { return []; }
    }
    return [
      {
        id: "AP-9482",
        customerName: "Sarah Jenkins",
        phone: "(216) 481-9920",
        address: "1482 Clifton Blvd, Lakewood, OH",
        issue: "Leaking Water Heater",
        urgency: "Emergency",
        status: "New Lead",
        timestamp: "10 minutes ago",
        photoUrl: "/images/hero_plumber.png",
        notes: "Water pooling under basement tank."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('american_plumbing_cms', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('american_plumbing_leads', JSON.stringify(leads));
  }, [leads]);

  const updateHeader = (newHeader) => {
    setContent(prev => ({ ...prev, header: { ...prev.header, ...newHeader } }));
  };

  const updateHero = (newHero) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...newHero } }));
  };

  const updateDispatchSettings = (newSettings) => {
    setContent(prev => ({ ...prev, dispatchSettings: { ...prev.dispatchSettings, ...newSettings } }));
  };

  const updateService = (index, updatedService) => {
    setContent(prev => {
      const newServices = [...prev.services];
      newServices[index] = { ...newServices[index], ...updatedService };
      return { ...prev, services: newServices };
    });
  };

  const addLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const loginAdmin = (password) => {
    if (password === 'american123' || password === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('american_plumbing_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('american_plumbing_admin_auth');
  };

  const resetToDefaults = () => {
    setContent(defaultContent);
    localStorage.removeItem('american_plumbing_cms');
  };

  return (
    <CMSContext.Provider value={{
      content,
      updateHeader,
      updateHero,
      updateDispatchSettings,
      updateService,
      leads,
      addLead,
      updateLeadStatus,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      resetToDefaults
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
