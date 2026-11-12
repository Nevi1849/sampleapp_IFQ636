
const Idea = require('../models/Idea');
const createIdea = async (req, res) => {
    const { title, category, problem, solution, targetMarket, fundingTarget } = req.body;
    const { action } = req.body;
    try {
        if (action !=='saveDraft' && action !== 'submit') {
        return res.status(400).json({ message: 'Invalid action'});
        }
        if (action === 'submit') {
            const requiredFields = [title, category, problem, solution, targetMarket];
            if (requiredFields.some(value => typeof value !== 'string' || !value.trim())) {
                return res.status(400).json({ message: 'Required fields are missing'});
            }
            if (!Number.isFinite(fundingTarget) || fundingTarget <= 0) {
                return res.status(400).json({message: 'Funding target must be a positive number'})
            }
        }
        const status = action === 'submit' ? 'Submitted' : 'Draft';
        const idea = new Idea({
            founder: req.user._id,
            title,
            category,
            problem,
            solution,
            targetMarket,
            fundingTarget,
            status
        });
        await idea.save();
        return res.status(201).json(idea);

    } catch(error) {
        console.error('Error creating idea', error);
        return res.status(500).json({message: 'Failed to create idea'});
    }

};

const getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({ founder: req.user._id });
        return res.status(200).json(ideas);

    } catch (error) {
       console.error('Error retreiving ideas', error);
       return res.status(500).json({ message: 'Failed to retreive ideas' }); 
    }
};

module.exports = { createIdea, getIdeas };